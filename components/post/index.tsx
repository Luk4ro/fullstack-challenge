import {
  Card,
  CardHeader,
  Button,
  Typography,
  CardActions,
  CardContent,
  Collapse,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { PostWithComment } from "../../pages/feed/types";

const PostCard = ({ title, body, comments }: PostWithComment) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardHeader title={title} />
      <CardContent>
        <Typography component="p">{body}</Typography>
      </CardContent>
      {comments.length > 0 && (
        <CardActions>
          <Button
            onClick={handleExpandClick}
            variant="text"
            aria-expanded={expanded}
          >
            {`Comments (${comments.length})`}
          </Button>
        </CardActions>
      )}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Stack spacing={1} p={1} sx={{ backgroundColor: "#EEEEEE" }}>
          {comments.map((comment) => (
            <Card key={comment.id} variant="outlined">
              <CardHeader title={comment.name} />
              <CardContent>
                <Typography component="p">{comment.body}</Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Collapse>
    </Card>
  );
};

export default PostCard;
