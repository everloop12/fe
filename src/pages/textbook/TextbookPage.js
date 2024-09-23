// import React, { useState, useEffect } from 'react';
// import { Container, CircularProgress, Card, CardContent, Typography, Button } from '@mui/material';
// import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
// import textdb from 'pages/textbook/textdb'; // Ensure this imports your textdb Firestore instance
// import { useNavigate } from 'react-router-dom';

// const TextbookPage = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const categoriesRef = collection(textdb, 'categories');
//       const querySnapshot = await getDocs(categoriesRef);

//       setCategories(querySnapshot.docs);
//       setLoading(false);
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Textbook
//       </Typography>

//       {loading ? (
//         <CircularProgress />
//       ) : (
//         categories.map((doc) => (
//           <Card key={doc.id} sx={{ mb: 2 }}>
//             <CardContent>
//               <Typography variant="h6">{doc.id}</Typography>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => navigate(`/subcategory/${doc.id}`)}
//               >
//                 View Subcategories
//               </Button>
//             </CardContent>
//           </Card>
//         ))
//       )}
//     </Container>
//   );
// };

// const TopicList = ({ subcategoryId }) => {
//   const [topics, setTopics] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTopics = async () => {
//       const topicsRef = collection(
//         textdb,
//         'categories',
//         'Medicine',
//         'subcategories',
//         subcategoryId,
//         'topics'
//       );
//       const querySnapshot = await getDocs(topicsRef);

//       setTopics(querySnapshot.docs);
//       setLoading(false);
//     };

//     fetchTopics();
//   }, [subcategoryId]);

//   return (
//     <Container>
//       {loading ? (
//         <CircularProgress />
//       ) : (
//         topics.map((doc) => (
//           <Card key={doc.id} sx={{ mb: 2 }}>
//             <CardContent>
//               <Typography variant="h6">{doc.data().title}</Typography>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => navigate(`/topic/${subcategoryId}/${doc.id}`)}
//               >
//                 View Topic
//               </Button>
//             </CardContent>
//           </Card>
//         ))
//       )}
//     </Container>
//   );
// };

// const TopicDetail = ({ subcategoryId, topicId }) => {
//   const [topic, setTopic] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTopic = async () => {
//       const topicRef = doc(
//         textdb,
//         'categories',
//         'Medicine',
//         'subcategories',
//         subcategoryId,
//         'topics',
//         topicId
//       );
//       const topicSnap = await getDoc(topicRef);
//       setTopic(topicSnap.data());
//       setLoading(false);
//     };

//     fetchTopic();
//   }, [subcategoryId, topicId]);

//   return (
//     <Container>
//       {loading ? (
//         <CircularProgress />
//       ) : topic ? (
//         <Card sx={{ mt: 2 }}>
//           <CardContent>
//             <Typography variant="h4">{topic.title}</Typography>
//             <Typography variant="body1" sx={{ mt: 2 }}>
//               {topic.content.replace(/\.(?=\s[A-Z])/g, '.\n\n')}
//             </Typography>
//           </CardContent>
//         </Card>
//       ) : (
//         <Typography>Topic not found</Typography>
//       )}
//     </Container>
//   );
// };
// export default TextbookPage;
// export { TextbookPage, TopicList, TopicDetail };
