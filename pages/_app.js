import { Layout } from "@components/Layout";
import { useEffect, useState } from "react";
import "../styles/globals.css";
import toast, { Toaster } from "react-hot-toast";
import Head from "next/head";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

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

  function buyNow(itemCode, qty, price, name, size, variant) {
    let tempCart = { itemCode: { qty: 1, price, name, size, variant } };

    setCart(tempCart);
    saveCartToLocalStorage(tempCart);
    router.push("/checkout");
  }

  function logout() {
    localStorage.removeItem("token");
    setUser({ value: null });
    setKey(Math.random());
    router.push("/");
    toast.success("Successfully logged out!");
  }

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCartToLocalStorage(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("cart");
    }
    let token = localStorage.getItem("token");
    if (token) {
      setUser({ value: token });
      setKey(Math.random());
    }
  }, [router.query]);

  return (
    <>
      <Script
        type="application/javascript"
        crossorigin="anonymous"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/code.png" />
      </Head>
      <Layout>
        <LoadingBar
          color="#D1345B"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          height={3}
          waitingTime={400}
        />
        <Layout.Header
          user={user}
          key={key}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          subTotal={subTotal}
          logout={logout}
        />
        <Component
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          subTotal={subTotal}
          buyNow={buyNow}
          {...pageProps}
        />
        <Layout.Footer />
        <Toaster position="top-center" reverseOrder={false} gutter={8} />
      </Layout>
    </>
  );
}

export default MyApp;
