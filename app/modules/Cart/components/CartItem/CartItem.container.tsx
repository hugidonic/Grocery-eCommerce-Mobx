import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { CartItemType } from '../../cart.types';
import { CartItemComponent } from './CartItem.component';
import { useActions } from '../../../../redux/hooks/useActions';

export interface CartItemContainerProps {
	cartItem: CartItemType;
	style?: StyleProp<ViewStyle>;
}

export const CartItemContainer = (props: CartItemContainerProps) => {
	const { removeProductFromCart, updateCartItem } = useActions();

	return (
		<CartItemComponent
			{...props}
			updateCartItem={updateCartItem}
			removeProductFromCart={() => removeProductFromCart(props.cartItem.cartItemId)}
		/>
	);
};