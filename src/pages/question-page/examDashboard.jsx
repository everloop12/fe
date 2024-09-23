import { Grid, Button, Collapse, Typography } from '@mui/material';
import { useGetQuestsQuery } from 'store/api/QuestAPISlice';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/reducers/user';
import { useEffect, useState } from 'react';
import Heatmap from './Heatmap'; 
import QuestCompletionPopup from './QuestCompletionPopup';  // Import the popup component
import QuestCard from 'components/cards/QuestCard/QuestCard';  // Adjust path if necessary
import TopicBar from './Components/topicsBar';  // Adjust path if necessary

const ExamDashboard = () => {
  const currentUser = useSelector(selectUser);
  const id = currentUser.uid;
  const { data: quests } = useGetQuestsQuery(id, { refetchOnMountOrArgChange: true });
  const [isDailyChallengesExpanded, setIsDailyChallengesExpanded] = useState(false);
  const [completedQuest, setCompletedQuest] = useState(null); // Track completed quest
  const [previouslyCompleted, setPreviouslyCompleted] = useState(new Set()); // Track quests already completed

  useEffect(() => {
    if (quests) {
      // Only check for the 3 displayed quests
      const displayedQuests = Object.values(quests?.entities || []).slice(0, 3);
  
      const completedQuests = displayedQuests.filter(
        (quest) =>
          quest.currentProgress >= quest.goal &&           // Quest is completed
          !previouslyCompleted.has(quest.id)               // Not already completed
      );
  
      if (completedQuests.length > 0) {
        // Pass the entire quest object or its title here
        const firstCompletedQuest = completedQuests[0];
        const questTitle = `Solve ${firstCompletedQuest.goal} Questions${firstCompletedQuest.ref ? ` in ${firstCompletedQuest.ref}` : ''}`;
  
        setCompletedQuest(questTitle);  // Set the questTitle here instead of just the tag
        setPreviouslyCompleted(prev => new Set(prev).add(firstCompletedQuest.id)); // Mark it as completed
      }
    }
  }, [quests, previouslyCompleted]);
  
  const toggleDailyChallenges = () => {
    setIsDailyChallengesExpanded((prevState) => !prevState);
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* Show Quest Completion Popup */}
      {completedQuest && (
  <QuestCompletionPopup
    questName={completedQuest}  // Now passing the full quest title
    show={true}
  />
)}


      {!currentUser.settings.focus && (
        <>
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Button
              variant="outlined"
              onClick={toggleDailyChallenges}
              className="tw-w-full tw-my-2 tw-flex tw-justify-center tw-items-center"
              sx={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                padding: '10px 0',
              }}
            >
              <Typography variant="h5" align="center" sx={{ color: 'black' }}>
                Daily Challenges
              </Typography>
            </Button>
          </Grid>

          <Collapse in={isDailyChallengesExpanded} style={{ width: '100%' }}>
            <Grid container spacing={2} sx={{ paddingTop: 2 }}>
              {Object.values(quests?.entities || []).slice(0, 3).map((x) => (
                <Grid key={x.id} item xs={12} sm={6} md={4} lg={3}>
                  <QuestCard
                    reward={x.reward}
                    tag={x.tag}
                    currentProgress={x.currentProgress}
                    goal={x.goal}
                    category={x.ref}
                  />
                </Grid>
              ))}
            </Grid>
          </Collapse>
        </>
      )}

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
      <TopicBar />

      <Grid item xs={12} sx={{ marginTop: '20px' }}>
        <Typography variant="h5" align="center" sx={{ marginBottom: '10px' }}>
          Activity Heatmap
        </Typography>
        <Heatmap />
      </Grid>
    </Grid>
  );
};

export default ExamDashboard;
