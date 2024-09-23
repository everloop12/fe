const CACHE_NAME = 'qa-app-api-cache-v1';

// Install event: No pre-cache needed
self.addEventListener('install', (event) => {
  console.log('Service Worker installed.');
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: Handle GET and POST requests
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Handle GET requests (cache-first for getUserData)
  if (event.request.method === 'GET' && url.origin === 'https://medmythica-api-rh5e6.ondigitalocean.app') {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone()); // Update cache with fresh response
              return networkResponse;
            });
          })
          .catch(() => {
            console.log('Network request failed, returning cached response if available.');
            return cachedResponse; // Return cached data in case of failure
          });

        return cachedResponse || fetchPromise;
      })
    );
  }

  // Handle POST requests (for answering or resetting questions)
  if (event.request.method === 'POST') {
    if (
      url.origin === 'https://medmythica-api-rh5e6.ondigitalocean.app' &&
      (url.pathname.includes('/v1/answer') || url.pathname.includes('/v1/answer/reset'))
    ) {
      event.respondWith(
        fetch(event.request)
          .then((networkResponse) => {
            // Successfully posted answer/reset, update cache immediately
            updateLocalCacheAfterPost(event.request, url.pathname.includes('/v1/answer'));
            return networkResponse;
          })
          .catch(() => {
            console.log('POST request failed, but modifying local cache for seamless experience.');
            // Still update local cache immediately to reflect user actions even if the POST fails
            updateLocalCacheAfterPost(event.request, url.pathname.includes('/v1/answer'));
            return new Response(JSON.stringify({ success: true, message: 'Local cache updated.' }));
          })
      );
    }
  }
});

// Function to update cache after POST request (answer or reset)
function updateLocalCacheAfterPost(request, isAnswer) {
  caches.open(CACHE_NAME).then((cache) => {
    cache.match('https://medmythica-api-rh5e6.ondigitalocean.app/v1/question/getUserData').then((cachedResponse) => {
      if (cachedResponse) {
        cachedResponse.json().then((data) => {
          const updatedData = modifyCacheData(data, request, isAnswer); // Modify cache based on the action
          const updatedResponse = new Response(JSON.stringify(updatedData));

          // Put the modified data back into the cache
          cache.put('https://medmythica-api-rh5e6.ondigitalocean.app/v1/question/getUserData', updatedResponse);
        });
      }
    });
  });
}

// Function to modify the cached data (getUserData) based on POST action
function modifyCacheData(cachedData, request, isAnswer) {
  const clonedData = { ...cachedData };

  // Parse the request body to get the question ID and the answer/reset action
  request.clone().json().then((requestBody) => {
    const questionId = requestBody.questionId;
    const userId = requestBody.userId;

    // Find the relevant question in the cachedData.questions array
    const question = clonedData.questions.find((q) => q.id === questionId);
    if (question) {
      if (isAnswer) {
        // Create an answer object based on the request body
        const answer = {
          userId,
          questionId,
          answer: requestBody.answer,
          isCorrect: requestBody.isCorrect,
          deleted: false,
        };

        // Add or update the answer in the question's answers array
        const existingAnswerIndex = question.answers.findIndex((ans) => ans.userId === userId);
        if (existingAnswerIndex > -1) {
          question.answers[existingAnswerIndex] = answer; // Update existing answer
        } else {
          question.answers.push(answer); // Add new answer
        }
      } else {
        // If it's a reset, remove the user's answers for that question
        question.answers = question.answers.filter((ans) => ans.userId !== userId);
      }
    }
  });

  return clonedData;
}
