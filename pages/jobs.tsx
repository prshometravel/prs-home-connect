import React from "react";

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default function JobsPage() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Jobs</h1>
      <p>Jobs page is loading correctly.</p>
    </div>
  );
}
	
