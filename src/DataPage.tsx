import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CircularProgress, Container, Paper } from '@mui/material';
import { Post } from './models'; // Import the Post interface from the models file

const DataPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Post[]>([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData);
                setLoading(false);
            });
    }, []);

    // console.log(data)

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'userId', headerName: 'User ID', width: 120 },
        { field: 'title', headerName: 'Title', width: 400 },
        { field: 'body', headerName: 'Body', width: 600 },
    ];

    if (loading) {
        return (
            <Container style={{ marginTop: '70px', textAlign: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" style={{ marginTop: '5px' }}>
            <Paper elevation={3} style={{ padding: '10px' }}>
                <h2 style={{ textAlign: 'center' }}>Posts</h2>
                <div style={{ height: 500, width: '100%' }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 25, page: 0 },
                            },
                        }}
                    />
                </div>
            </Paper>
        </Container>
    );
};

export default DataPage;
