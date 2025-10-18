import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { orderDataStorageAtom, printStrukModalAtom } from "@/jotai/atoms";
import { useAtom } from "jotai";
import EachUtils from "@/utils/EachUtils";
import PrintStruk from "@/components/modules/Browse/PrintStruk";
import BrowseLayout from "@/components/layouts/BrowseLayout";

const PaymentSuccess = () => {
    const navigate = useNavigate();

    const [orderDataStorage] = useAtom(orderDataStorageAtom)

    const [, setPrintStrukModal] = useAtom(printStrukModalAtom)

    const formatCurrency = (num) => {
        if (num) {
            let formatted = new Intl.NumberFormat('ID-id', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(num)
            return formatted
        }
    }

    return (
        <BrowseLayout>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                    className="mb-6"
                >
                    <CheckCircle2 className="text-green-500 w-20 h-20 sm:w-28 sm:h-28" />
                </motion.div>


                <h1 className="text-2xl sm:text-4xl font-bold text-blue-600 mb-2 text-center">
                    Pembayaran Berhasil!
                </h1>
                <p className="text-gray-600 text-center text-sm sm:text-lg mb-6">
                    Terima kasih telah berbelanja di <span className="font-semibold">EcoMart</span>.<br />
                    Konfirmasi pesanan telah dikirim ke email Anda.
                </p>


                <div className="bg-white shadow-md rounded-2xl p-4 sm:p-8 w-full max-w-2xl">
                    <h2 className="text-lg sm:text-2xl font-semibold text-blue-500 mb-3">
                        Ringkasan Pesanan
                    </h2>

                    <div className="border-t border-gray-200 pt-3 flex flex-col gap-2 text-gray-700 text-sm sm:text-base">
                        <EachUtils
                            of={orderDataStorage?.order}
                            render={(item, index) => (
                                <div key={index} className="flex justify-between">
                                    <span
                                        className="max-w-[180px] sm:max-w-full text-[14px]"
                                    >{item.title} × {item.quantity}</span>
                                    <span>{formatCurrency(item.price * 1000)}</span>
                                </div>
                            )}
                        />
                    </div>
                    <div className="border-t border-gray-200 mt-4 pt-3 flex justify-between text-blue-600 font-semibold text-base sm:text-lg">
                        <span>Total Pembayaran</span>
                        <span>{formatCurrency(orderDataStorage?.total)}</span>
                    </div>

                    <div className="mt-4 text-gray-500 text-xs sm:text-sm">
                        <p>Dikirim ke:</p>
                        <p>{orderDataStorage?.address?.fullName}, {orderDataStorage?.address?.street}, {orderDataStorage?.address?.city}</p>
                    </div>
                </div>


                <div className="flex gap-4 mt-8">
                    <button
                        onClick={() => navigate("/")}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-lg shadow-md cursor-pointer"
                    >
                        Kembali ke Beranda
                    </button>

                    <button
                        variant="outline"
                        onClick={() => setPrintStrukModal(true)}
                        className="border-blue-400 text-blue-600 hover:bg-blue-50 px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-lg cursor-pointer"
                    >
                        Cetak Struk
                    </button>
                </div>
                <PrintStruk
                    total={orderDataStorage?.total}
                    address={orderDataStorage?.address}
                    order={orderDataStorage?.order}
                />
            </div>
        </BrowseLayout>
    )
}

export default PaymentSuccess;
