import { Grid } from '../../../../node_modules/@mui/material/index';
import MainCard from 'components/MainCard';
import TopicsTable from './topicTable';

const QuestionsBar = () => {
    return (
        <Grid item xs={12} md={7} lg={8}>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <h5 style={{ margin: "0px" }}  >Topics</h5>
                </Grid>
                <Grid item />
            </Grid>
            <MainCard sx={{ mt: 2 }} content={false}>
                <TopicsTable />
            </MainCard>
        </Grid>
    );
};

export default QuestionsBar;
    