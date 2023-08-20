import { useEffect } from 'react';
import { Container, Paper, Grid } from '@mui/material'
import DataPage from './DataPage'
import DepartmentList from './DepartmentList'
import { useNavigate } from 'react-router-dom'

const Data: React.FC = () => {
    const navigate = useNavigate()

    const userDetails = localStorage.getItem('userDetails')

    useEffect(() => {
        if (!userDetails) {
            alert('Fill the details first');
            navigate('/');
        }
    }, [userDetails, navigate]);

    return (
        <Container maxWidth="lg" style={{ marginTop: '50px' }}>
            <Paper elevation={3} style={{ padding: '10px' }}>
                <h2 style={{ textAlign: 'center', fontSize: '2rem' }}>Data Page</h2>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <div>
                            <DepartmentList />
                        </div>
                    </Grid>
                    <Grid item xs={9}>
                        <div>
                            <DataPage />
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default Data;
