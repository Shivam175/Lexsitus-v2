import { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import MenuItem from "Models/MenuItem";
import { type DocumentType } from "Models/ReadingList/@types";
import { type PdfEntity } from "Models/Tabs/@types";
import ToeAppModel from "Models/ToeApp";
import { logger } from "utils/logger";

export const useGetToaepPdfDocument = () => {
    const { slug } = useParams<{ slug: string }>();
    const [searchParams] = useSearchParams();
    const docTypeSearchParam = searchParams.get("type") as DocumentType;
    const isSearchParamValid = docTypeSearchParam === "ToeAppDocument";
    const [pdfDocument, setPdfItem] = useState<
    Pick<PdfEntity, "id" | "metadata" | "pdfURL" | "title">
    >({
        id: "",
        metadata: [],
        pdfURL: "",
        title: "",
    });

    const handleGetPdfById = useCallback(async (docId: string) => {
        const data = await ToeAppModel.getDocumentById(docId);

        const { title, pdfURL, metadata, id } = data;
        setPdfItem({ title, pdfURL, metadata, id });
    }, []);

    const handleGetPdf = useCallback(async (docId: string) => {
        const data = await ToeAppModel.findById({
            filter: { where: { menuItemId: docId } },
        });

        const { title, pdfURL, metadata, id } = data;
        setPdfItem({ title, pdfURL, metadata, id });
    }, []);

    const handleGetItemId = useCallback(async () => {
        if (!slug) return;
        const menuItem = await MenuItem.getMenuItem(slug);

        await handleGetPdf(menuItem.id);
    }, [slug]);

    useEffect(() => {
        try {
            if (slug) {
                if (isSearchParamValid) void handleGetPdfById(slug);
                else void handleGetItemId();
            }
        } catch (error: unknown) {
            logger.error(error);
        }
    }, [slug, isSearchParamValid]);

    return {
        pdfDocument,
    };
};
