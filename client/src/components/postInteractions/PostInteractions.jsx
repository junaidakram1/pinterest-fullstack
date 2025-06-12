import Image from "../Image/Image";
import "./postInteractions.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";

const interact = async (id, type) => {
  const res = await apiRequest.post(`/pins/interact/${id}`, { type });
  console.log("Interaction response:", res.data);
  return res.data;
};

const PostInteractions = ({ postId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, type }) => interact(id, type),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["interactionCheck", postId], (oldData) => {
        if (!oldData) return oldData;

        if (variables.type === "like") {
          return {
            ...oldData,
            isLiked: !oldData.isLiked,
            likeCount: oldData.isLiked
              ? oldData.likeCount - 1
              : oldData.likeCount + 1,
          };
        }

        if (variables.type === "save") {
          return {
            ...oldData,
            isSaved: !oldData.isSaved,
          };
        }

        return oldData;
      });
    },
    onError: (err) => {
      console.error("Interaction error:", err);
    },
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["interactionCheck", postId],
    queryFn: () =>
      apiRequest
        .get(`/pins/interaction-check/${postId}`)
        .then((res) => {
          console.log("Fetched interactionCheck data:", res.data);
          return res.data;
        })
        .catch((err) => {
          console.error("Error fetching interactionCheck:", err);
          throw err;
        }),
    staleTime: 0, // disables caching so it fetches fresh every time
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error loading interaction data</div>;

  return (
    <div className="postInteractions">
      <div className="interactionIcons">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => mutation.mutate({ id: postId, type: "like" })}
        >
          <path
            d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
            stroke={data.isLiked ? "#e50829" : "#000000"}
            strokeWidth="2"
            fill={data.isLiked ? "#e50829" : "none"}
          />
        </svg>
        {data.likeCount}
        <Image path="/general/share.svg" alt="Share" />
        <Image path="/general/more.svg" alt="More" />
      </div>
      <button
        disabled={mutation.isPending}
        onClick={() => mutation.mutate({ id: postId, type: "save" })}
      >
        {data.isSaved ? "Saved" : "Save"}
      </button>
    </div>
  );
};

export default PostInteractions;
