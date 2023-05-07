export const getCitationText = (
    metadata?: Array<{
        name: string;
        val: string;
    }>,
    title?: string
) => {
    const pdfTitle = title?.split(",");
    const pdfConfig = {
        title: "",
        presistentUrl: "",
        date: "",
    };
    metadata?.forEach((data) => {
        if (data.name === "Persistent URL") pdfConfig.presistentUrl = data.val;
        if (data.name === "Title") pdfConfig.title = data.val;
        if (data.name === "Date created") pdfConfig.date = data.val;
    });

    if (pdfTitle)
        return `${pdfTitle[2]},${pdfConfig.title} ${pdfConfig.date} (${pdfConfig.presistentUrl}).`;

    return "";
};

export const getResourceNotFoundMsg = () => `<p class="noResourceFound">
        No resource found for this menu entry
    </p>`;
