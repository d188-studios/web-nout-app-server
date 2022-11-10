create or replace function set_user_initial_state() returns trigger as $after_users_insert$
begin

insert into verificaciones(usuario, fecha_enviado, verificado) values (new.uuid, current_date);

return new;
end;

$after_users_insert$ language plpgsql;


create trigger after_users_insert after insert on users for each row execute procedure set_user_initial_state();
