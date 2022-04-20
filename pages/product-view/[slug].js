import { useRouter } from "next/router";
import React from "react";

const Slug = () => {
  const router = useRouter();
  const { query } = router;

  return <div>Slug is {query.slug}</div>;
};

export default Slug;
