/* eslint-disable react/display-name */
import React from "react";
import { Footer, Header } from "..";

export const Layout = ({ children }) => <>{children}</>;

Layout.Header = ({
  key,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
  user,
  logout,
}) => {
  return (
    <Header
      key={key}
      cart={cart}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      clearCart={clearCart}
      subTotal={subTotal}
      user={user}
      logout={logout}
    />
  );
};

Layout.Body = ({ children }) => <main id="main">{children}</main>;

Layout.Footer = () => <Footer />;

// export const Layout = ({ children }) => {
//   return (
//     <div>
//       <Header />
//       {children}
//       <Footer />
//     </div>
//   );
// };
