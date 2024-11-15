import React from "react";
import { FormGroup, Box, Skeleton } from "@mui/material";

const FilterOptionLoadinSkelton = () => {
  return (
    <>
      {Array.from(new Array(4)).map((_, index) => (
        <FormGroup key={index}>
          <Box display="flex" alignItems="center">
            <Skeleton
              variant="rectangular"
              width={24}
              height={24}
              sx={{ mr: 1 }}
            />
            <Skeleton variant="text" width="80%" height={20} />
          </Box>
        </FormGroup>
      ))}
    </>
  );
};

export default FilterOptionLoadinSkelton;
