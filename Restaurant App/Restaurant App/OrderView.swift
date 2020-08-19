//
//  OrderView.swift
//  Restaurant App
//
//  Created by Dylan Dunn on 5/7/20.
//  Copyright © 2020 Dylan Dunn. All rights reserved.
//

import SwiftUI

struct OrderView: View {
    @EnvironmentObject public var order : Order
    @State public var showingOrderConfirmation = false
    
    var body: some View {
        NavigationView {
            VStack(spacing: 12) {
                List {
                    ForEach(order.orderItems) { menuItem in
                        OrderItemView(menuItem: menuItem)
                    }
                    .onDelete(perform: delete)
                }
                VStack(spacing: 12) {
                    HStack {
                        Spacer()
                        Text("Total: $\(String(format: "%.2f", self.order.orderTotal))")
                    }
                    Button(action: {
                        self.showingOrderConfirmation = true
                    }) {
                        Text("Place Order")
                            .font(.title)
                            .padding(12)
                            .foregroundColor(.black)
                    }
                    .frame(maxWidth: .infinity)
                    .accentColor(Color.white)
                    .background(Color.yellow)
                    .cornerRadius(12)
                    .sheet(isPresented: $showingOrderConfirmation) {
                        OrderPreparationView(isShowing: self.$showingOrderConfirmation)
                    }
                }
                .padding(12)
            }
            .navigationBarTitle("Order")
        }
    }
    
    func delete(at offsets: IndexSet) {
        self.order.orderItems.remove(atOffsets: offsets)
        self.order.orderTotal = 0.00
        self.order.orderItems.forEach( { menuItem in
            self.order.orderTotal += menuItem.itemCost
        })
    }
}

struct OrderView_Previews: PreviewProvider {
    
    static var previews: some View {
        OrderView().environmentObject(Order())
    }
}
