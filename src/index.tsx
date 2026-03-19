import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from 'components/article';
import { ArticleParamsForm } from 'components/article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const mapSettingsToCSSProperties = (
	settings: ArticleStateType
): CSSProperties =>
	({
		'--font-family': settings.fontFamilyOption.value,
		'--font-size': settings.fontSizeOption.value,
		'--font-color': settings.fontColor.value,
		'--container-width': settings.contentWidth.value,
		'--bg-color': settings.backgroundColor.value,
	} as CSSProperties);

const App = () => {
	const [stylesSettings, setStylesSettings] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={mapSettingsToCSSProperties(stylesSettings)}>
			<ArticleParamsForm
				settings={stylesSettings}
				onApply={setStylesSettings}
				onReset={() => setStylesSettings(defaultArticleState)}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
