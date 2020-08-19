//
//  MenuView.swift
//  InstaHelper
//
//  Created by Dylan Dunn on 8/15/20.
//  Copyright © 2020 Dylan Dunn. All rights reserved.
//

import SwiftUI

struct MenuView: View {
    var body: some View {
        NavigationView {
            List {
                RowView(
                    destination: AnyView(ScanBarcodeView()),
                    label: "Scan Barcode",
                    systemName: "barcode.viewfinder")
                RowView(
                    destination: AnyView(MenuView()),
                    label: "Common Barcodes",
                    systemName: "barcode")
                RowView(
                    destination: AnyView(MenuView()),
                    label: "Manually Enter Barcode",
                    systemName: "number.square")
            }
        }
    }
}

struct RowView: View {
    var destination: AnyView
    var label: String
    var systemName: String
    
    var body: some View {
        NavigationLink(destination: destination) {
            HStack {
                Image(systemName: systemName)
                    .foregroundColor(.gray)
                Text(label)
            }
        }
    }
}

struct MenuView_Previews: PreviewProvider {
    static var previews: some View {
        MenuView()
    }
}
