import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';

const OtherApplications = () => {
    const [projLinks, setProjLinks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchLinks();
    }, []);

    const fetchLinks = async () => {
        try {
            const res = await axios.get(`http://192.168.10.18:1337/api/projects/ParaPo`);
            console.log("API response", res);
            setProjLinks(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const forwardToLink = (link) => {
        if (link) {
            window.open(link, "_blank", "noopener,noreferrer");
        }
    };

    const goback = async () => {
        navigate('/pasahero')
    }

    return (    
        <div className=" text-center w-full">
            <div className='mb-[5rem] font-bold text-5xl'>
                <h1>Partnering Stores</h1>
                <Button onClick={goback}>go back</Button>
            </div>
            <Grid container spacing={4}>
                {projLinks.map((project) => (
 
                    <Grid item xs={12} sm={6} md={4} key={project.id}>
                        <Card
                            className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                            onClick={() => forwardToLink(project.link)}
                        >
                            <CardMedia
                                component="img"
                                height="140"
                                image={`http://192.168.10.18:1337/uploads/${project.image}`}
                                alt={project.name}
                                className="h-48 object-cover"
                            />
                            <CardContent>
                                <Typography variant="h6" component="div" className="text-center">
                                    {project.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                ))}
            </Grid>
        </div>
    );
};

export default OtherApplications;