import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "state";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function PostHamburger({ postId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUpdate = (e) => {
    e.stopPropagation();
    console.log("update here");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async (e) => {
    try {
      e.stopPropagation();
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response) {
        dispatch(deletePost({ id: postId }));
      }
    } catch (err) {
      console.log(err);
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
