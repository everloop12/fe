import { Grid, Button, Collapse, Typography } from '@mui/material';
import { useGetQuestsQuery } from 'store/api/QuestAPISlice';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/reducers/user';
import { useEffect, useState } from 'react';
import Heatmap from './Heatmap'; 
import QuestCompletionPopup from './QuestCompletionPopup';  
import QuestCard from 'components/cards/QuestCard/QuestCard';  
import TopicBar from './Components/topicsBar';  

const ExamDashboard = () => {
  const currentUser = useSelector(selectUser);
  const id = currentUser.uid;
  const { data: quests } = useGetQuestsQuery(id, { refetchOnMountOrArgChange: true });
  const [isDailyChallengesExpanded, setIsDailyChallengesExpanded] = useState(false);
  const [completedQuest, setCompletedQuest] = useState(null);
  const [previouslyCompleted, setPreviouslyCompleted] = useState(new Set());

  const [theme] = useState(localStorage.getItem('theme') || 'default'); // Read theme from local storage

  useEffect(() => {
    if (quests) {
      const displayedQuests = Object.values(quests?.entities || []).slice(0, 3);
      const completedQuests = displayedQuests.filter(
        (quest) =>
          quest.currentProgress >= quest.goal &&
          !previouslyCompleted.has(quest.id)
      );

      if (completedQuests.length > 0) {
        const firstCompletedQuest = completedQuests[0];
        const questTitle = `Solve ${firstCompletedQuest.goal} Questions${firstCompletedQuest.ref ? ` in ${firstCompletedQuest.ref}` : ''}`;
        setCompletedQuest(questTitle);
        setPreviouslyCompleted((prev) => new Set(prev).add(firstCompletedQuest.id));
      }
    }
  }, [quests, previouslyCompleted]);

  const toggleDailyChallenges = () => {
    setIsDailyChallengesExpanded((prevState) => !prevState);
  };

  // Define inline styles for dark themes (Dark and Space) and for light/default themes
  const isDarkTheme = theme === 'dark' || theme === 'space';

  // Styles for semi-transparent backgrounds and conditional text colors
  const styles = {
    dashboard: {
      color: isDarkTheme ? '#ffffff' : '#000000',
      padding: '20px',
    },
    semiTransparentBox: {
      backgroundColor: isDarkTheme ? 'rgba(18, 18, 18, 0)' : 'rgba(255, 255, 255, 0)', // Semi-transparent background
      borderRadius: '8px', // Optional, makes it look softer
      padding: '15px',
      boxShadow: isDarkTheme ? '0px 4px 12px rgba(0, 0, 0, 0.3)' : '0px 4px 12px rgba(0, 0, 0, 0.1)',
    },
    button: {
      backgroundColor: isDarkTheme ? 'rgba(51, 51, 51, 0)' : 'rgba(255, 255, 255, 0)',
      color: isDarkTheme ? '#fff' : '#000',
      border: `1px solid ${isDarkTheme ? '#555' : '#ccc'}`,
      padding: '10px 0',
      borderRadius: '8px',
    },
    heading: {
      color: isDarkTheme ? '#fff' : '#000',
    },
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} style={styles.dashboard}>
      {completedQuest && (
        <QuestCompletionPopup questName={completedQuest} show={true} />
      )}

      {!currentUser.settings.focus && (
        <>
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Button
              variant="outlined"
              onClick={toggleDailyChallenges}
              className="tw-w-full tw-my-2 tw-flex tw-justify-center tw-items-center"
              style={styles.button}
            >
              <Typography variant="h5" align="center" style={styles.heading}>
                Daily Challenges
              </Typography>
            </Button>
          </Grid>

          <Collapse in={isDailyChallengesExpanded} style={{ width: '100%' }}>
            <Grid container spacing={2} sx={{ paddingTop: 2 }}>
              {Object.values(quests?.entities || []).slice(0, 3).map((x) => (
                <Grid key={x.id} item xs={12} sm={6} md={4} lg={3}>
                  <div style={styles.semiTransparentBox}> {/* Semi-transparent wrapper for QuestCard */}
                    <QuestCard
                      reward={x.reward}
                      tag={x.tag}
                      currentProgress={x.currentProgress}
                      goal={x.goal}
                      category={x.ref}
                    />
                  </div>
                </Grid>
              ))}
            </Grid>
          </Collapse>
        </>
      )}

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
      <TopicBar />

      <Grid item xs={12} sx={{ marginTop: '20px' }}>
        <Typography variant="h5" align="center" style={styles.heading}>
          Activity Heatmap
        </Typography>
        <div style={styles.semiTransparentBox}>
          <Heatmap />
        </div>
      </Grid>
    </Grid>
  );
};

export default ExamDashboard;
