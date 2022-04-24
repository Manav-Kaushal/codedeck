import { Layout } from "@components/Layout";
import { useEffect, useState } from "react";
import "../styles/globals.css";
import toast, { Toaster } from "react-hot-toast";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);

  function saveCartToLocalStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    let subt = 0;
    let keys = Object.keys(cart);
    for (let i = 0; i < keys.length; i++) {
      subt += cart[keys[i]].price * cart[keys[i]].qty;
    }
    setSubTotal(subt);
  }

  function addToCart(itemCode, qty, price, name, size, variant) {
    let tempCart = cart;
    if (itemCode in cart) {
      toast.success("Item quantity updated!");
      tempCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      toast.success("Item added to bag!");
      tempCart[itemCode] = { qty: 1, price, name, size, variant };
    }
    setCart(tempCart);
    saveCartToLocalStorage(tempCart);
  }

  function removeFromCart(itemCode, qty, price, name, size, variant) {
    let tempCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      if (tempCart[itemCode].qty <= 1) {
        tempCart[itemCode].qty = cart[itemCode].qty - qty;
      } else {
        toast.success("Item quantity updated!");
        tempCart[itemCode].qty = cart[itemCode].qty - qty;
      }
    }
    if (tempCart[itemCode].qty <= 0) {
      toast.success("Item removed from cart!");
      delete tempCart[itemCode];
    }
    setCart(tempCart);
    saveCartToLocalStorage(tempCart);
  }

  function clearCart() {
    toast.success("Removed all items from cart!");
    setCart({});
    saveCartToLocalStorage({});
  }

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCartToLocalStorage(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("cart");
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <Layout.Header
          key={subTotal}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          subTotal={subTotal}
        />
        <Component
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          subTotal={subTotal}
          {...pageProps}
        />
        <Layout.Footer />
        <Toaster position="top-center" reverseOrder={false} gutter={8} />
      </Layout>
    </>
  );
}

export default MyApp;
