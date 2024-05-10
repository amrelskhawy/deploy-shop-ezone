import "./SelectedOrder.scss"


const SelectedOrder = ({ selectedOrder }) => {
  return (
    <div>
      <div className="selected-order__top text-slate-700">
        <div className="selectedOrder-text">
          <p className="text-2xl font-bold">
            طلب #
            {selectedOrder.order.OrdNum}
          </p>
          <p className="text-sm">
            {selectedOrder.order.OrdDate}
          </p>
        </div>
        <p className={`order-badge status-${selectedOrder.order.Status}`}>
          {selectedOrder.order.StatusDesc}
        </p>
      </div>
      <div className="selected-order__body text-slate-700 text-sm">

        {/* Order Amount */}

        <div className="order__field">
          <p>الإجمالى: </p>
          <p>
            {selectedOrder.order.SubAmount} د.ل
          </p>
        </div>

        <div className="order__field">
          <p>التوصيل: </p>
          <p>
            {selectedOrder.order.DeliveryRate} د.ل
          </p>
        </div>

        <div className="order__field">
          <p>الصافى: </p>
          <p className="text-green-600 font-bold" >
            {selectedOrder.order.SubAmount - selectedOrder.order.DeliveryRate} د.ل
          </p>
        </div>

        {/* Customer details */}

        <div className="order__field">
          <p>الزبون: </p>
          <p>
            {selectedOrder.order.CusName}
          </p>
        </div>

        <div className="order__field">
          <p>الهاتف: </p>
          <p>
            {selectedOrder.order.PhoneNo}
          </p>
        </div>

        <div className="order__field">
          <p>الهاتف الثاني: </p>
          <p >
            {selectedOrder.order.PhoneNo2}
          </p>
        </div>


        {/* Order Details */}
        <div className="order__field">
          <p>المنتج</p>
          <p>
            {selectedOrder.orderItems[0].Name}
          </p>
        </div>

        <div className="order__field">
          <p>الكود</p>
          <p>
            {
              selectedOrder.orderItems[0].Code !== null ?
                selectedOrder.orderItems[0].Code : 'لا يوجد'
            }
          </p>
        </div>

        <div className="order__field">
          <p>الكمية</p>
          <p>
            {selectedOrder.orderItems[0].Qty}
          </p>
        </div>

        <div className="order__field">
          <p>السعر</p>
          <p>
            {selectedOrder.orderItems[0].Price} د.ل
          </p>
        </div>

        <div className="order__field">
          <p>الإجمالى</p>
          <p>
            {selectedOrder.orderItems[0].Price *
              selectedOrder.orderItems[0].Qty} د.ل
          </p>
        </div>
      </div>
    </div>
  )
}

export default SelectedOrder