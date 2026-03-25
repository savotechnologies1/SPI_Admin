interface OrderItem {
  date: string;
  orderNo: string;
  firstName: string;
  lastName: string;
  product?: string;
  qty: number;
}

interface OrderList {
  total: number;
  list: OrderItem[];
}

interface OrdersData {
  openOrders?: OrderList;
  fulfilledOrders?: OrderList;
}

interface OrderStatusProps {
  orders: OrdersData;
  onMonthChange?: (month: string) => void;
}

const OrderStatus = ({ orders }: OrderStatusProps) => {
  return (
    <div className="flex justify-between gap-4">
      <div className="bg-white rounded-lg shadow-md p-4 md:w-[100%] overflow-x-auto mt-6">
        <h2 className="text-lg font-semibold mb-4">
          Open Orders (Total: {orders?.openOrders?.total || 0})
        </h2>
        <div className="max-h-[400px] overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm whitespace-nowrap">
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Order</th>
                <th className="py-2 px-4 text-left">First Name</th>
                <th className="py-2 px-4 text-left">Last Name</th>
                <th className="py-2 px-4 text-left">Product</th>
                <th className="py-2 px-4 text-left">Qty</th>
              </tr>
            </thead>
            <tbody>
              {(orders?.openOrders?.list?.length ?? 0) > 0 ? (
                orders?.openOrders?.list?.map(
                  (item: OrderItem, index: number) => (
                    <tr key={index} className="border-b text-sm">
                      <td className="py-2 px-4">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4">{item.orderNo}</td>
                      <td className="py-2 px-4">{item.firstName}</td>
                      <td className="py-2 px-4">{item.lastName}</td>
                      <td className="py-2 px-4">{item.product || "-"}</td>
                      <td className="py-2 px-4">{item.qty}</td>
                    </tr>
                  ),
                )
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 md:w-full mt-6">
        <h2 className="text-lg font-semibold mb-4">
          Fulfilled Orders (Total: {orders?.fulfilledOrders?.total || 0})
        </h2>
        <div className="max-h-[400px] overflow-y-auto border rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead className="sticky top-0 bg-gray-100 z-10">
              <tr className="text-gray-600 whitespace-nowrap">
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Order</th>
                <th className="py-2 px-4 text-left">First Name</th>
                <th className="py-2 px-4 text-left">Last Name</th>
                <th className="py-2 px-4 text-left">Product</th>
                <th className="py-2 px-4 text-left">Qty</th>
              </tr>
            </thead>

            <tbody>
              {(orders?.fulfilledOrders?.list?.length ?? 0) > 0 ? (
                orders?.fulfilledOrders?.list?.map(
                  (item: OrderItem, index: number) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-2 px-4">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4">{item.orderNo}</td>
                      <td className="py-2 px-4">{item.firstName}</td>
                      <td className="py-2 px-4">{item.lastName}</td>
                      <td className="py-2 px-4">{item.product || "-"}</td>
                      <td className="py-2 px-4 font-medium">{item.qty}</td>
                    </tr>
                  ),
                )
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-400">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
