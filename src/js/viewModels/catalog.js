define(
    ['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojlistview', 'ojs/ojarraydataprovider'
    ],
    function (oj, ko, $) {
        'use strict';
        function CatalogModel() {
            var self = this;

            var data = [{ name: 'Stroopwafels', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8 },
            { name: 'Klompen', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8 },
            { name: 'Mini-Molentjes', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8 },
            { name: 'Delfts Blauw Spul', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8 },
            { name: 'Drop', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8 }
            ];
            self.dataProvider = new oj.ArrayDataProvider(data,
                {
                    keys: data.map(function (value) {
                        return value.name;
                    })
                });

            self.handleSelectionChanged = function (event) {
                // Access selected elements via ui.items
                var selectedProduct = event.detail.value; 
                console.log("selected product "+selectedProduct);
            }
        }

        return new CatalogModel();
    }
);
