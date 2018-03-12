define(
    ['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojlistview', 'ojs/ojarraydataprovider'
    ],
    function (oj, ko, $) {
        'use strict';
        function CatalogModel() {
            var self = this;

            self.productData = [{ name: 'Stroopwafels', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8 },
            { name: 'Klompen', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8 },
            { name: 'Mini-Molentjes', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8 },
            { name: 'Delfts Blauw Spul', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8 },
            { name: 'Drop', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8 }
            ];
            self.dataProvider = new oj.ArrayDataProvider(self.productData,
                {
                    keys: self.productData.map(function (value) {
                        return value.name;
                    })
                });

            self.handleSelectionChanged = function (event) {
                // Access selected elements via ui.items
                var selectedProduct = event.detail.value;
                console.log("selected product " + selectedProduct);

                var productSelectionEvent = {
                    "eventType": "productSelectionEvent"
                    , "source": "Products Portlet"
                    , "payload": {
                        "nameSelectedProduct": selectedProduct
                    }
                }
                var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
                rootViewModel.callParent(productSelectionEvent)
            }

            self.username = ko.observable("");
            self.customerIdentifier = ko.observable("");
            var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
               
            rootViewModel.registerGlobalContextListener(
                function (globalContext) {
                    console.log("catalog - global context listener - receiving global context " + JSON.stringify(globalContext))
                    var customer = globalContext.customer
                    self.username(customer.title + " " + customer.firstName + " " + customer.lastName)
                    self.customerIdentifier(customer.customerIdentifier)
                }
            )

        }

        return new CatalogModel();
    }
);
