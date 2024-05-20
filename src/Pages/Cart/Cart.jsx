import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAll, handleAdd, handleDec, remove } from "../../Toolkit/cartSlice";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";


const Cart = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cart);
  console.log(data.cart);
  const handleIncrement = (item) => {
    dispatch(handleAdd(item));
  };
  const handleDecrement = (item) => {
    dispatch(handleDec(item));
  };
  const isConfirmed=(id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
       handelete(id)
      }
    });
    const handelete=(id)=>{
      console.log(id);
      dispatch(remove(id))
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });

    }
  }
  const calculateTotalSum = (item) => {
    return item.price * item.quantity;
  };
  const totalSum =data.cart?.reduce((total, item) => total + calculateTotalSum(item), 0);
  const handleClear=()=>{
    console.log("hello");
    dispatch(clearAll())
  }

  return (
    <div>
      <div class="container mx-auto mt-10">
        <div class="flex shadow-md my-10">
          <div class="w-3/4 bg-white px-10 py-10">
            <div class="flex justify-between border-b pb-8">
              <h1 class="font-semibold text-2xl">Shopping Cart</h1>
              <h2 class="font-semibold text-2xl">
                <span style={{ color: "red" }}>{data.cart?.length}</span> Items
              </h2>
            </div>
            <div class="flex mt-10 mb-5">
              <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Quantity
              </h3>
              <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Price
              </h3>
              <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Total
              </h3>
            </div>
            {data.cart?.map((item) => (
              <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div class="flex w-2/5">
                  <div class="w-20">
                    <img class="h-24" src={item.thumbnail} alt="" />
                  </div>
                  <div class="flex flex-col justify-between ml-4 flex-grow">
                    <span class="font-bold text-sm">{item.title}</span>
                    <span class="text-red-500 text-xs">{item.brand}</span>
                    <Button className="font-semibold hover:text-red-500 text-gray-500 text-xs" onClick={()=>isConfirmed(item.id)} >
                      remove
                    </Button>
                  </div>
                </div>
                <div class="flex justify-center w-1/5">
                  <Button onClick={() => handleDecrement(item)}>-</Button>
                  <Button>{item.quantity}</Button>
                  <Button onClick={() => handleIncrement(item)}>+</Button>
                </div>
                <span class="text-center w-1/5 font-semibold text-sm">
                  {item.price}
                </span>
                <span class="text-center w-1/5 font-semibold text-sm">
                  {item.price * item.quantity}
                </span>
                <span>{calculateTotalSum(item)}</span>
              </div>
            ))}

            <Link
              to={"/"}
              class="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                class="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
            <Button onClick={()=>handleClear()}>clearAll</Button>
          </div>

          <div id="summary" class="w-1/4 px-8 py-10">
            <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
            <div class="flex justify-between mt-10 mb-5">
              <span class="font-semibold text-sm uppercase">Items:{data.cart?.length}</span>
              <span class="font-semibold text-sm">{totalSum}</span>
            </div>
            <div>
              <label class="font-medium inline-block mb-3 text-sm uppercase">
                Shipping
              </label>
              <select class="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping - $10.00</option>
              </select>
            </div>
            <div class="py-10">
              <label
                for="promo"
                class="font-semibold inline-block mb-3 text-sm uppercase"
              >
                Promo Code
              </label>
              <input
                type="text"
                id="promo"
                placeholder="Enter your code"
                class="p-2 text-sm w-full"
              />
            </div>
            <button class="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
              Apply
            </button>
            <div class="border-t mt-8">
              <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>{totalSum+10}</span>
              </div>
              <button class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
