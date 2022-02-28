// React and packages
import React from "react";
import { StyleProp, ViewStyle, FlatList, Dimensions } from "react-native";
import { observer } from "mobx-react-lite";
// Types and utils
import { data } from "../../utils/data";
// Components
import { Block, GroupListItem } from "..";

export interface GroupsListProps {
  style?: StyleProp<ViewStyle>
}

const { width } = Dimensions.get('screen');

export const GroupsList = observer(function GroupsList(props: GroupsListProps) {
	return (
		<FlatList
			data={data.groups}
			renderItem={({ item }) => <GroupListItem group={item} />}
			keyExtractor={(item, idx) => idx.toString()}
			horizontal
			showsHorizontalScrollIndicator={false}
			ListHeaderComponent={() => <Block style={{ width: 20 }} />}
			ListFooterComponent={() => <Block style={{ width: 20 }} />}
			style={{ marginLeft: -20, width, marginVertical: 20 }}
			ItemSeparatorComponent={() => (
				<Block style={{ marginHorizontal: 10 }} />
			)}
		/>
	);
})