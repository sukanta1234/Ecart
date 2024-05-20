import React, { useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { singleProductApi } from "../../Toolkit/productSlice";
import { handleCart } from "../../Toolkit/cartSlice";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { single: product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(singleProductApi(id));
  }, [id, dispatch]);

  const handleClick = () => {
    dispatch(handleCart(product));
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={product.thumbnail}
              alt={product.title}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" onClick={handleClick}>
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SingleProduct;
