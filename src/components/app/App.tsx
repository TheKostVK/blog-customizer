import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { CSSProperties, useState } from 'react';
import { ArticleParamsForm } from 'components/article-params-form';
import { Article } from 'components/article';

import styles from './App.module.scss';

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
			className={styles.main}
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

export default App;
