import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update, query, orderByChild, equalTo } from 'firebase/database';
import CartListItem from '../components/CartListItem';
import { formatPriceType } from '../lib/utils';
import { useCallback } from 'react';


export default function OrderList({ status }) {
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		fetchData()

		return () => {
			fetchData()
		}
	}, []);


	const fetchData = useCallback(() => {
		const db = getDatabase();
		//const starCountRef = ref(db, "orders");
		const starCountRef = query(ref(db, "orders"), orderByChild("status"), equalTo(status));
		onValue(starCountRef, (snapshot) => {
			let data = snapshot.val();
			if (!data) data = []
			if (!Array.isArray(data)) setOrders(Object.values(data))
			else
				setOrders(data);
		});
	}, [status]);

	const updateOrder = async (id) => {
		try {
			const db = getDatabase();
			const dbRef = ref(db, "orders/" + id);
			await update(dbRef, {// tu da
				status: status + 1,
			})
			fetchData();
		} catch (error) {
			console.log(error)
		}
	};

	const handleAccept = async (orderId) => {
		try {
			orderId && await updateOrder(orderId);
			Alert.alert("Successfully", "Update successfully", [{ text: "ok" }])// alert co van de hay sao ay loi tu vang nay hoi truoc nhan cung gap r
		} catch (error) {
			console.log(error)
			Alert.alert("Error", "Update error", [{ text: "ok" }]);
		}

	}

	const handleCancel = async (orderId) => {

	}//het loi r can gi nua ha trung con cai ma

	return (
		<>
			{!orders.length ? <Text>Bạn không có đơn hàng</Text>
				:
				<FlatList
					data={orders}
					renderItem={({ item }) =>
						<View style={styles.cart}>
							<Text style={{ fontWeight: 'bold', margin: 10, fontSize: 18 }}>Order #{item.id.substring(0, 3)}</Text>
							<View style={styles.info}>
								<View style={styles.infoItem}>
									<Text>Họ tên: </Text>
									<Text>{item.name}</Text>
								</View>
								<View style={styles.infoItem}>
									<Text>Số điện thoại: </Text>
									<Text> {item.phone}</Text>
								</View>
								<View style={styles.infoItem}>
									<Text>Địa chỉ: </Text>
									<Text> {item.address}</Text>
								</View>
							</View>
							<View style={styles.viewcart}>
								<FlatList
									data={item.cartItems}
									renderItem={({ item: cart }) => {
										return <CartListItem isHideBtn={true} productCartItems={cart?.product} cartQuantity={cart?.cartQuantity} />
									}}
									keyExtractor={(cart, idx) => idx} />

							</View>
							<Text style={{ margin: 10, fontSize: 16, fontWeight: 'bold' }}>Tổng tiền: {formatPriceType(item.cartTotalAmount)}</Text>
							<View style={styles.selection}>
								{
									status >= 3 ?
										<Text>Success</Text>
										:
										<>
											<TouchableOpacity style={styles.btn} onPress={() => handleCancel(item.id)}>
												<Text>Cancel</Text>
											</TouchableOpacity>
											<TouchableOpacity style={styles.btn} onPress={() => handleAccept(item.id)}>
												<Text>Accept</Text>
											</TouchableOpacity>
										</>
								}
							</View>
						</View>
					}
					keyExtractor={(item, idx) => idx} />
			}
		</>
	)
}

const styles = StyleSheet.create({
	cart: {
		padding: 10,
		backgroundColor: '#fff',
		marginBottom: 20
	},
	info: {
		margin: 10,
	},
	infoItem: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	viewcart: {
		// height: 200,
		marginBottom: 15,
	},
	selection: {
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	btn: {
		marginTop: 20,
		width: "20%",
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#a7dbc5",
		color: "#fff",
		marginHorizontal: 10
	}
});