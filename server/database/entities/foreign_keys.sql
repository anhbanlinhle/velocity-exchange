use velocity_exchange;

alter table payment_info
add constraint fk_account_payment_info
foreign key (user_id) references account(id);

alter table verification_request
add constraint fk_account_verification_request_1
foreign key (seller_id) references account(id);

alter table verification_request
add constraint fk_account_verification_request_2
foreign key (admin_id) references account(id);

alter table verification_request
add constraint fk_car_verification_request
foreign key (car_id) references car(id);

alter table verification_request
add constraint fk_payment_verification_request
foreign key (payment_id) references payment(id);

alter table auction
add constraint fk_account_auction_1
foreign key (host_id) references account(id);

alter table auction
add constraint fk_account_auction_2
foreign key (winner_id) references account(id);

alter table auction
add constraint fk_car_auction
foreign key (car_id) references car(id);

alter table bid
add constraint fk_auction_bid_1
foreign key (auction_id) references auction(id);

alter table bid
add constraint fk_account_bid_2
foreign key (customer_id) references account(id);

alter table auction_registration
add constraint fk_auction_auction_registration
foreign key (auction_id) references auction(id);

alter table auction_registration
add constraint fk_account_auction_registration
foreign key (customer_id) references account(id);

alter table auction_registration
add constraint fk_payment_auction_registration
foreign key (payment_id) references payment(id);

alter table bid_winner
add constraint fk_account_bid_winner
foreign key (user_id) references account(id);

alter table bid_winner
add constraint fk_payment_bid_winner
foreign key (payment_id) references payment(id);

alter table payment
add constraint fk_account_payment
foreign key (user_id) references account(id);