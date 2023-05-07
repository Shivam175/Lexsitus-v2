---
to: src/Components/<%= h.inflection.camelize(name) %>/index.tsx
---
import React, { type FC } from 'react';
import styles from './index.module.scss';

export interface <%= h.inflection.camelize(name) %>Props { }


const <%= h.inflection.camelize(name) %>: FC<<%= h.inflection.camelize(name) %>Props> = (props) => {
	return <div className={styles["<%=h.inflection.dasherize(name)%>"]}><%= h.inflection.camelize(name) %></div>;
};

export default <%= h.inflection.camelize(name) %>;