import React from "react";
import GalleryItem from "../GalleryItem/GalleryItem";
import "./gallery.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

const fetchPins = async ({ pageParam, search }) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/pins?cursor=${pageParam}&search=${
      search || ""
    }`
  );
  return res.data;
};

const Gallery = ({ search }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    status,
    error,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["pins", search],
    queryFn: ({ pageParam = 0 }) => fetchPins({ pageParam, search }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  console.log("Status", status);
  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>Error: {error.message}</p>;

  const allPins = data?.pages.flatMap((page) => page?.pins ?? []) || [];

  console.log("data", data);
  console.log("allpins", allPins);

  return (
    <InfiniteScroll
      dataLength={allPins.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4 style={{ textAlign: "center" }}>Loading more pins...</h4>}
      endMessage={
        !isFetchingNextPage && (
          <h3 style={{ textAlign: "center" }}>All Posts Loaded!</h3>
        )
      }
    >
      <div className="gallery">
        {allPins.map((item) => (
          <GalleryItem key={item._id} item={item} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Gallery;
