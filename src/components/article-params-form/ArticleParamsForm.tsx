import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	settings: ArticleStateType;
	onApply: (settings: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { settings, onApply, onReset } = props;
	const [draftSettings, setDraftSettings] =
		useState<ArticleStateType>(settings);

	const sideMenuRef = useRef<HTMLDivElement>(null);

	const [sideMenuIsOpen, setSideMenuIsOpen] = useState<boolean>(false);

	const handleSideMenuClick = (value: boolean) => {
		setSideMenuIsOpen(value);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(draftSettings);
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setDraftSettings(defaultArticleState);
		onReset();
	};

	useOutsideClickClose({
		isOpen: sideMenuIsOpen,
		onChange: handleSideMenuClick,
		rootRef: sideMenuRef,
	});

	useEffect(() => {
		setDraftSettings(settings);
	}, [settings]);

	return (
		<>
			<ArrowButton
				isOpen={sideMenuIsOpen}
				onClick={() => handleSideMenuClick(!sideMenuIsOpen)}
			/>
			<aside
				ref={sideMenuRef}
				className={clsx(styles.container, {
					[styles.container_open]: sideMenuIsOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={draftSettings.fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={(value) =>
							setDraftSettings((prevSettings) => ({
								...prevSettings,
								fontFamilyOption: value,
							}))
						}
					/>
					<RadioGroup
						name={'fontSizeOptions'}
						selected={draftSettings.fontSizeOption}
						options={fontSizeOptions}
						title={'Размер шрифта'}
						onChange={(value) =>
							setDraftSettings((prevSettings) => ({
								...prevSettings,
								fontSizeOption: value,
							}))
						}
					/>
					<Select
						selected={draftSettings.fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={(value) =>
							setDraftSettings((prevSettings) => ({
								...prevSettings,
								fontColor: value,
							}))
						}
					/>
					<Separator />
					<Select
						selected={draftSettings.backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={(value) =>
							setDraftSettings((prevSettings) => ({
								...prevSettings,
								backgroundColor: value,
							}))
						}
					/>
					<Select
						selected={draftSettings.contentWidth}
						options={contentWidthArr}
						title={'Ширина'}
						onChange={(value) =>
							setDraftSettings((prevSettings) => ({
								...prevSettings,
								contentWidth: value,
							}))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
