import { useEffect, useState } from "react";
import "./CustomerOrders.scss";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { axiosInstance } from "@/shared/http-interceptor";
import SelectedOrder from "../SelectedOrder/SelectedOrder";

const CustomerOrders = ({ Orders, Open, cartLink, setIsOpen }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [customersOrders, setCustomerOrders] = useState(Orders);

  useEffect(() => {
    if (Orders) {
      setCustomerOrders(Orders);
    } else {
      setCustomerOrders({
        orders: [],
        total: 0
      });
    }
  }, [Orders]);

  const selectOrder = async (orderId) => {
    // Fetching the specific order details
    try {
      const res = await axiosInstance.get(`LandingPage/getCustomerLandingOrder?orderId=${orderId}&link=${cartLink}`);

      setSelectedOrder(res.data);
      // setSelectedOrder(data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const closeTheModal = () => {
    setIsOpen(false);
    setSelectedOrder(null);
  };

  const backToOrders = () => {
    setSelectedOrder(null);
  };

  return (
    <Modal backdrop="opaque" isOpen={Open} onClose={closeTheModal} scrollBehavior="inside" className="h-[500px]">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 mr-2">طلباتى</ModalHeader>
        <hr className="mx-4" />
        <ModalBody className="p-4 orders__container">
          {!selectedOrder ? (
            <>
              {customersOrders && customersOrders.orders && customersOrders.orders.length > 0 ? (
                customersOrders.orders.map(order => (
                  <div key={order.Id} className="order-card" onClick={() => selectOrder(order.Id)}>
                    <div className="order-card__header">
                      <p className="font-bold">#{order.OrdNum}</p>
                      <p className="text-sm">{order.OrdDate}</p>
                    </div>
                    <hr />
                    <div className="order-card__body">
                      <p>القيمة:<span>{order.SubAmount}</span></p>
                      <p>الحالة:<span className={`order-badge status-${order.Status}`} >{order.StatusDesc}</span></p>
                      <p>المنتج:<span>{order.ProductName}</span></p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-xl pt-8">
                  لا يوجد طلبات في السلة
                </p>
              )}
            </>
          ) : (
            <SelectedOrder selectedOrder={selectedOrder} />
          )}
        </ModalBody>
        <ModalFooter>
          {selectedOrder ? (
            <button onClick={backToOrders} className="text-center text-xl text-slate-700 w-full border-1 border-slate-700 p-2 rounded-xl">
              عودة
            </button>
          ) : (
            <>
              إجمالي الطلبات:
              <span>
                {customersOrders.total} {customersOrders.total > 2 ? 'طلبات' : 'طلب'}
              </span>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomerOrders;
