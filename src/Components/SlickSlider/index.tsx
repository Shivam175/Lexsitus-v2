import clsx from "clsx";
import { type FC, isValidElement, type PropsWithChildren, type ReactNode } from "react";
import Slider from "react-slick";
import styles from "./index.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


interface SlickSliderProps {
    sliderClassName?: string;
}

const SlickSlider: FC<PropsWithChildren<SlickSliderProps>> = (props) => {
    const { children, sliderClassName } = props;
    const settings = {
        dots: true,
        infinite: true,
        speed: 350,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const renderSlides = () => {
        if (isValidElement(children) && children)
            return (
                <div className={clsx(sliderClassName, styles["slide-content"])}>
                    {children}
                </div>
            );
        
        if (children)
            return (children as ReactNode[]).map((element, idx) => {
                if (element) {
                    return (
                        <div
                            key={`slideItem_${idx}`}
                            className={clsx(
                                sliderClassName,
                                styles["slide-content"],
                            )}
                        >
                            {element}
                        </div>
                    );
                }

                return null;
            });
        
    };

    return (
        <>
            <div className={styles["slider-container"]}>
                <Slider {...settings}>{renderSlides()}</Slider>
            </div>
        </>
    );
};

export default SlickSlider;
