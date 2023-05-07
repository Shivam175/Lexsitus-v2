
export type IAvailableIcon =
  | "favicon-darkgrey"
  | "mithya-logo"
  | "cilrap-HELM-logo-regjeringen"
  | "cilrap-HELM-logo-cilrap"
  | "cilrap-HELM-logo-INPA"
  | "cilrap-logo"
  | "homeslide_infographic2"
  | "DPGA-logo1"
  | "favicon2"
  | "enter-lexitus"
  | "home-library"
  | "enter-library"
  | "icicil-logo"
  | "laval-CDIPH-logo1"
  | "helm-logo"
  | "lexsitus-icons38"
  | "digest-decisions-icon"
  | "toep-icon1"
  | "infographic-ar"
  | "infographic-en"
  | "infographic-fr"
  | "infographic-fa"
  | "lib-intro-icons-order"
  | "lib-intro-icons-microscope"
  | "lib-intro-icons-radio"
  | "home-left-panel-team"
  | "home-left-panel-toep"
  | "home-left-panel-cmnHub"
  | "home-left-panel-zoomin"
  | "home-left-panel-matrix"
  | "library-top-mainLibIcon"
  | "global-icon-cap"
  | "global-icon-colorCap"
  | "global-icon-lib"
  | "global-icon-colorLib"
  | "global-icon-matrix"
  | "global-icon-colorMatrix"
  | "document-icons-home"
  | "document-icons-minar"
  | "document-icons-order"
  | "document-icons-filledBook"
  | "document-icons-bookZoom"
  | "document-icons-message"
  | "document-icons-sketch"
  | "document-icons-folder"
  | "homepage-icons-tutorials"
  | "homepage-icons-edit"
  | "sm-icons-google"
  | "sm-icons-facebook"
  | "sm-icons-twitter"
  | "sm-icons-colorGoogle"
  | "sm-icons-colorFacebook"
  | "sm-icons-colorTwitter"
  | "global-menu-icon-hamburger1"
  | "global-menu-icon-hamburger2"
  | "home-top-right-team"
  | "home-top-right-report"
  | "home-top-right-lecture"
  | "home-top-right-home"
  | "cpij-logo-leaf"
  | "cpij-logo-cpig-logo"
  | "lexsitus-icons38-playButton"
  | "lexsitus-icons38-message"
  | "cilrap"
  | "warrior"
  | "INLA"
  | "library-top-toep"
  | "library-top-cmnHub"
  | "library-top-zoomin"
  | "library-top-matrix"
  | "left-arrow"
  | "cross"
  | "lexitus-icons38-prep"
  | "lexitus-icons38-Case"
  | "lexitus-icons38-Eocd"
  | "lexitus-icons38-Eoc"
  | "lexitus-icons38-Mopd";

export interface IconsProps {
    icon: IAvailableIcon;
    altText?: string;
    className?: string;
    imageHeight?: string;
    imageWidth?: string;
}