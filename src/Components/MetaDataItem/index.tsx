/* eslint-disable @typescript-eslint/indent */
import React, { type FC } from "react";

import Button from "Components/Button";

export interface MetaDataItemProps {
	heading: string;
	text: string;
	linkIdentificationWord?: string;
}


const MetaDataItem: FC<MetaDataItemProps> = ({ heading, text, linkIdentificationWord }) => (

	<ul className="metadata-div">
		<li>
			<strong className="meta-heading">
				{heading}
			</strong>
			{":  "}
			<span className="meta-text">
				{
					text.includes(linkIdentificationWord ?? "https") ? (
						<Button
							isExternal={true}
							link={text}
							className="text-lxsBlue4"
						>
							{text}
						</Button>
					) : (
						<span className="meta-plain-text"> {text} </span>
					)
				}

			</span>
		</li>
	</ul>


);

export default MetaDataItem;