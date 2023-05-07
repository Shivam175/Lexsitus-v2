import { type FC } from "react";
import ToaepLayout from "./ToaepLayout";
import LibraryContextProvider from "Feature/Library/Context";
import PageTemplate from "Feature/PageTemplate";

const Toaep: FC = () => (
    <PageTemplate>
        <LibraryContextProvider>
            <ToaepLayout />
        </LibraryContextProvider>
    </PageTemplate>
);

export default Toaep;
