/* eslint-disable camelcase */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                transparent: "transparent",
                current: "currentColor",
                grey1: "#131313",
                grey2: "#292929",
                grey3: "#686868",
                grey4: "#cccccc",
                grey5: "#e0e0e0",
                grey6: "#ECECEC",
                grey7: "#eaeaea",
                grey8: "#f4f4f4",
                grey9: "#878787",
                grey10: "#919191",
                grey11: "#9E9E9E",
                black: "#000000",
                lxsheaderbackgroundhover: "#0000001a",
                white: "#ffffff",
                white2: "#f0f0f0",
                purple: "#8365AA",
                purple2: "#8877AA",
                blue: "#409fb5",
                blue2: "#26a69a",
                yellow: "#988359",
                orange: "#9f7268",
                orange1: "#ee6e73",
                red: "#ff356e",
                lxsGrey1: "#f4f4f4",
                lxsGrey2: "#eaeaea",
                lxsGrey3: "#e0e0e0",
                lxsGrey4: "#cccccc",
                lxsGrey5: "#686868",
                lxsGrey6: "#878787",
                lxsGrey7: "#212121",
                lxsGrey8: "#403F3F",
                lxsGrey9: "#454545",
                lxsGrey10: "#969696",
                lxsGrey11: "#333333",
                lxsGrey12: "#464547",
                lxsGrey13: "#7d7d7d",
                lxsGrey14: "#bebdc2",
                lxsGrey15: "#5a5a5a",
                lxsGrey16: "#e4e4e4",
                lxsPurple1: "#8B77AA",
                lxsPurple2: "#8365AA",
                lxsBlue1: "#5c9ac4",
                lxsBlue2: "#4086c1",
                lxsBlue3: "#4bb4bf",
                lxsBlue4: "#039be5",
                lxsYellow1: "#D6A14c",
                lxsYellow2: "#D69512",
                lxsGreen1: "#92a35f",
                lxsGreen2: "#829944",
                lxsGreen3: "#26a69a",
                lxslibborderselect: "#f2f2f2",
                lxslibselectbackground: "#ffffffe6",
                dialogBackground: "#212121e6",
                dialogCloseIcon: "#bbbbbb",
                dialogCloseIconOnHover: "#777777",
                dialogContent: "#00000059",
                msgDialogBackground: "#00000066",
                mediumGrey: "#00000099",
                listModalHover: "#eeeeee",
                toastBlackBgColor: "#323232",
                color_lectures: "#A91927",
                color_lectures1: "#B5324B",
                color_clicc: "#8366AA",
                color_clicc1: "#8C78AA",
                color_prepworks: "#839944",
                color_prepworks1: "#93A35F",
                color_caselaw: "#4287C2",
                color_caselaw1: "#5D99C3",
                color_eoc: "#EC661E",
                color_eoc1: "#EE7441",
                color_eocd: "#D69514",
                color_eocd1: "#D6A14C",
                color_mopd: "#9F4D16",
                color_mopd1: "#B0612B",
                color_anchorTag: "#131090",
            },
        },

        fontFamily: {
            fontFamilyBlack: "Roboto, sans-serif",
            fontFamilyArial: "Arial, sans-serif",
            fontFamilyHalvetica: "Helvetica,sans-serif",
        },

        boxShadow: {
            medium: `0 2px 2px 0 rgba(0, 0, 0, 0.14),
                         0 1px 5px 0 rgba(0, 0, 0, 0.12),
                         0 3px 1px -2px rgba(0, 0, 0, 0.2)`,
            sm: `0 1px 2px 0 rgb(0 0 0 / 0.05)`,
        },
    },
    plugins: [],
};
