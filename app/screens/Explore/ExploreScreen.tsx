// React and packages
import React, { FC } from 'react';

import { Dimensions, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
// Types and utils
import { CategoryType } from '../../modules/Categories';
import { NavigatorParamList } from '../../navigators';
import { colors, spacing } from '../../theme';
// Components
import { Block, Loading, Screen, SearchBar, Text } from '../../components';
import { Product } from '../../modules';
// Selectors
import * as ProductSelectors from '../../modules/Products/products.selectors';
import * as CategoriesSelectors from '../../modules/Categories/categories.selectors';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';

const { width } = Dimensions.get('screen');

export type ExploreScreenProps = StackScreenProps<NavigatorParamList, 'TabsStack'>;

export const ExploreScreen: FC<ExploreScreenProps> = (props) => {
	const [ searchText, setSearchText ] = React.useState<string>('');

	const IsLoading = useTypedSelector((state) => state.CategoriesStore.isLoading);
	const filteredProducts = useTypedSelector(
		ProductSelectors.productsFilteredByName(searchText)
	);
	const categories = useTypedSelector(CategoriesSelectors.categories);

	if (IsLoading) {
		return <Loading />;
	}

	const renderCategory = (category: CategoryType) => (
		<Block
			style={styles.category}
			bRadius={14}
			shadow
			color={category.color}
			key={category.categoryId}
		>
			<TouchableOpacity
				style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
				onPress={() =>
					props.navigation.navigate('category', {
						categoryId: category.categoryId
					})}
			>
				{/* @ts-ignore */}
				<Image source={category.picture} style={styles.image} />
				<Text weight="bold" size="large">
					{category.name}
				</Text>
			</TouchableOpacity>
		</Block>
	);

	return (
		<Screen style={styles.container} preset="fixed">
			<Block justify="center" align="center" style={{ marginVertical: 30 }}>
				<Text weight="black" size="title">
					Find Products
				</Text>
			</Block>

			<Block style={{ marginBottom: 15 }}>
				<SearchBar search={searchText} setSearch={setSearchText} />
			</Block>

			{searchText.length === 0 ? (
				<FlatList
					data={categories}
					renderItem={({ item }: { item: CategoryType }) =>
						renderCategory(item)}
					keyExtractor={(item: CategoryType) => item.categoryId}
					showsVerticalScrollIndicator={false}
					numColumns={2}
					columnWrapperStyle={{
						justifyContent: 'space-between'
					}}
				/>
			) : (
				<Block>
					<Text weight="bold" size="medium">
						Products
					</Text>
					<FlatList
						data={filteredProducts}
						renderItem={({ item }) => <Product product={item} />}
						numColumns={2}
						showsVerticalScrollIndicator={false}
						keyExtractor={(item) => item.productId}
						columnWrapperStyle={{
							justifyContent: 'space-between'
						}}
					/>
				</Block>
			)}
		</Screen>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.palette.offWhite,
		paddingHorizontal: spacing[5]
	},
	image: {
		resizeMode: 'contain',
		marginBottom: 20,
		width: 80,
		height: 80
	},
	category: {
		width: width * 0.5 - 32,
		height: 180,
		marginBottom: spacing[4]
	}
});
