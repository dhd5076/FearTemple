//
//  MenuRowView.swift
//  InstaHelper
//
//  Created by Dylan Dunn on 8/15/20.
//  Copyright © 2020 Dylan Dunn. All rights reserved.
//

import SwiftUI

struct MenuRowView: View {
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

struct MenuRowView_Previews: PreviewProvider {
    static var previews: some View {
        MenuRowView(destination: AnyView(MenuView()), label: "Example Menu Item", systemName: "barcode.viewfinder")
    }
}
