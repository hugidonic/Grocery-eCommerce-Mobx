// React and packages
import React, { FC } from 'react';

import { Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
// Types and utils
import { NavigatorParamList } from '../../navigators';
import { colors, spacing } from '../../theme';
import { data } from '../../utils/data';
// Components
import { Block, Screen, SearchBar, Text } from '../../components';

const { width } = Dimensions.get('screen');

export type ExploreScreenProps = StackScreenProps<
	NavigatorParamList,
	'TabsStack'
>;

export const ExploreScreen: FC<
	ExploreScreenProps
> = (props) => {

	const renderGroup = (group: GroupType, idx: number) => (
		<Block
			style={styles.group}
			bRadius={14}
			shadow
			color={group.color}
			key={group.groupId}
		>
			<TouchableOpacity
				style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
				onPress={() =>
					props.navigation.navigate('group', {groupId: group.groupId})}
			>
				{/* @ts-ignore */}
				<Image source={group.picture} style={styles.image} />
				<Text weight='bold' size="large">
					{group.name}
				</Text>
			</TouchableOpacity>
		</Block>
	);

	return (
		<Screen style={styles.container} preset="scroll">
			<Block
				justify="center"
				align="center"
				style={{ marginVertical: 30 }}
			>
				<Text weight='black' size='title'>
					Find Products
				</Text>
			</Block>

			<Block style={{ marginBottom: 15 }}>
				<SearchBar />
			</Block>

			<Block
				row
				style={{ width: '100%', flexWrap: 'wrap' }}
				justify={'space-between'}
			>
				{data.groups.map(renderGroup)}
			</Block>
		</Screen>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.palette.offWhite,
		paddingHorizontal: spacing[5]
	},
	image: {
		resizeMode: 'contain',
		marginBottom: 20,
		width: 80,
		height: 80,
	},
	group: {
		width: width * 0.5 - 32,
		height: 180,
		marginBottom: spacing[4] 
	}
});
