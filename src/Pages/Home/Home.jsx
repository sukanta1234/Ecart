import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryApi,
  categoryWiseApi,
  limitApi,
  productApi,
  searchApi,
} from "../../Toolkit/productSlice";
import {
  Box,
  Container,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  const [count, setCount] = useState(10);
  console.log(count);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product);
  // console.log("category",data.Product)
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(productApi());
    dispatch(categoryApi());
  }, [dispatch]);

  const handleClick = (item) => {
    dispatch(categoryWiseApi(item));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchApi(input));
  };
  const handleLimit = () => {
    // console.log(count);
    dispatch(limitApi(count));
    setCount(count + 10);
  };

  return (
    <Container sx={{ marginTop: "20px" }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ marginBottom: "20px" }}
      >
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{ marginBottom: "10px" }}
        />
        <Button variant="contained" type="submit" fullWidth>
          Search
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Box sx={{ position: "sticky", top: "20px" }}>
            {data.category?.map((item) => (
              <Button
                key={item}
                fullWidth
                variant="outlined"
                sx={{ marginBottom: "10px" }}
                onClick={() => handleClick(item)}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            {data?.Product?.map((item) => (
              <Grid item xs={12} sm={6} lg={4} key={item.id}>
                <Card>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={item.thumbnail
                    }
                    // title={item.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" component={Link} to={`/${item.id}`}>
                      More...
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Button onClick={handleLimit}>Move..</Button>
    </Container>
  );
};

export default Home;
