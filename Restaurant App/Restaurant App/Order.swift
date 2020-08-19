//
//  Order.swift
//  Restaurant App
//
//  Created by Dylan Dunn on 5/7/20.
//  Copyright © 2020 Dylan Dunn. All rights reserved.
//

import SwiftUI

class Order: ObservableObject {
    @Published public var orderItems : [MenuItem] = []
    @Published public var orderTotal : Float = 0.00
}
