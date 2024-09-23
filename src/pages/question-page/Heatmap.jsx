import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css'; // Import default styles
import './Heatmap.css'; // Custom styles
import moment from 'moment';
import { useGetAnalyticsQuery } from 'store/api/CategoryApiSlice';

const Heatmap = () => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [stats, setStats] = useState({
    average: 0,
    learnedDays: 0,
    longestStreak: 0,
    currentStreak: 0,
  });

  const { data: answers, isSuccess } = useGetAnalyticsQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess && answers?.entities) {
      const today = new Date();
      const last180Days = [];

      // Initialize daily answer count map for the last 180 days
      for (let i = 179; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateString = moment(date).format('YYYY-MM-DD');
        last180Days.push({ date: dateString, count: 0 });
      }

      // Loop through each category and calculate daily counts
      let totalAnswers = 0;
      let nonZeroDays = 0;
      let longestStreak = 0;
      let currentStreak = 0;
      let tempStreak = 0;

      Object.values(answers.entities).forEach((category) => {
        category.questions.forEach((question) => {
          (question.answers || []).forEach((answer) => {
            const answerDate = moment(answer.createdAt).format('YYYY-MM-DD');
            const dateIndex = last180Days.findIndex((day) => day.date === answerDate);
            if (dateIndex !== -1) {
              last180Days[dateIndex].count += 1;
              totalAnswers += 1;
            }
          });
        });
      });

      // Calculate stats for average, streaks, and learned days
      last180Days.forEach((day) => {
        if (day.count > 0) {
          nonZeroDays += 1;
          tempStreak += 1;
          if (tempStreak > longestStreak) {
            longestStreak = tempStreak;
          }
        } else {
          tempStreak = 0;
        }
      });

      // Current streak
      for (let i = last180Days.length - 1; i >= 0; i--) {
        if (last180Days[i].count > 0) {
          currentStreak += 1;
        } else {
          break;
        }
      }

      // Set the stats, ensuring average is based on non-zero days
      setStats({
        average: (totalAnswers / nonZeroDays).toFixed(2),
        learnedDays: nonZeroDays,
        longestStreak,
        currentStreak,
      });

      setHeatmapData(last180Days);
    }
  }, [answers, isSuccess]);

  return (
    <div className="heatmap-container">
      <CalendarHeatmap
        startDate={moment().subtract(3, 'months').toDate()}
        endDate={moment().add(3, 'months').toDate()}
        values={heatmapData}
        classForValue={(value) => {
          if (!value || value.count === 0) return 'color-empty';
          if (value.count >= 1 && value.count < 5) return 'color-scale-1';
          if (value.count >= 5 && value.count < 15) return 'color-scale-2';
          if (value.count >= 15 && value.count < 20) return 'color-scale-3';
          if (value.count >= 20 && value.count < 35) return 'color-scale-4';
          if (value.count >= 35 && value.count < 50) return 'color-scale-5';
          if (value.count >= 50 && value.count < 60) return 'color-scale-6';
          if (value.count >= 60 && value.count < 75) return 'color-scale-7';
          if (value.count >= 75 && value.count < 90) return 'color-scale-8';
          if (value.count >= 90 && value.count < 100) return 'color-scale-9';
          return 'color-scale-10'; // For counts >= 100
        }}
        titleForValue={(value) => {
          if (!value || !value.date) return 'No cards reviewed';
          const formattedDate = moment(value.date).format('dddd, MMMM D, YYYY');
          return `${value.count} questions answered on ${formattedDate}`;
        }}
        showWeekdayLabels={true}
        weekdayLabels={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
        gutterSize={2}
        showMonthLabels={true}
        horizontal={true}
      />
      <div className="heatmap-stats" style={{ textAlign: 'right', fontSize: '26px', marginTop: '20px' }}>
        <p style={{ marginBottom: '5px' }}>Daily Average Questions: {stats.average}</p>
        <p style={{ marginBottom: '5px' }}>Days Learned: {stats.learnedDays} days</p>
        <p style={{ marginBottom: '5px' }}>Longest Streak: {stats.longestStreak} days</p>
        <p style={{ marginBottom: '5px' }}>Current Streak: {stats.currentStreak} days</p>
      </div>
    </div>
  );
};

export default Heatmap;
