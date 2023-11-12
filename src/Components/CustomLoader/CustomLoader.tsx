import { forwardRef } from "react";
import cx from "clsx";
import { Box, MantineLoaderComponent } from "@mantine/core";
import classes from "./CustomLoader.module.css";

export const CustomLoader: MantineLoaderComponent = forwardRef(
    ({ className, ...others }, ref) => (
        <Box
            component="span"
            className={cx(classes.loader, className)}
            {...others}
            ref={ref}
        />
    )
);
