--USER INSERT

create or replace function set_user_initial_state() returns trigger as $after_users_insert$
begin

insert into verificaciones(usuario, fecha_enviado, verificado) values (new.uuid, current_date);

return new;
end;

$after_users_insert$ language plpgsql;


create trigger after_users_insert after insert on users for each row execute procedure set_user_initial_state();



--ENCUESTA UPDATE


create or replace function set_encuesta_promedio() returns trigger as $after_encuestas_update$
begin

insert into verificaciones(usuario, fecha_enviado, verificado) values (new.uuid, current_date);

return new;
end;

$after_encuestas_update$ language plpgsql;


create trigger after_encuestas_update after update on encuestas for each row when (OLD.contestada IS DISTINCT FROM NEW.contestada) execute  procedure set_encuesta_promedio();





-- VERIFICACION UPDATE

create or replace function set_verificacion_historial() returns trigger as $after_verificaciones_update$
begin

insert into verificaciones(usuario, fecha_enviado, verificado) values (new.uuid, current_date);

return new;
end;

$after_verificaciones_update$ language plpgsql;

create trigger after_verificaciones_update after update on verificaciones for each row when (OLD.verificado IS DISTINCT FROM NEW.verificado) execute  procedure set_verificacion_historial();





-- USER BANEADO


create or replace function set_baneado_historial() returns trigger as $after_users_update_ban$
begin

insert into verificaciones(usuario, fecha_enviado, verificado) values (new.uuid, current_date);

return new;
end;

$after_users_update_ban$ language plpgsql;

create trigger after_users_update_ban after update on users for each row when (OLD.baneado IS DISTINCT FROM NEW.baneado) execute  procedure set_baneado_historial();



-- USERS UPDATE PASSWORD

  create or replace function set_password_historial() returns trigger as $after_users_update_password$
begin

insert into verificaciones(usuario, fecha_enviado, verificado) values (new.uuid, current_date);

return new;
end;

$after_users_update_password$ language plpgsql;

create trigger after_users_update_password after update on users for each row when (OLD.password IS DISTINCT FROM NEW.password) execute  procedure set_password_historial();




-- TRIGGERS

create trigger after_users_insert after insert on users for each row execute procedure set_user_initial_state();
create trigger after_encuestas_update after update on encuestas for each row when (OLD.contestada IS DISTINCT FROM NEW.contestada) execute  procedure set_encuesta_promedio();
create trigger after_verificaciones_update after update on verificaciones for each row when (OLD.verificado IS DISTINCT FROM NEW.verificado) execute  procedure set_verificacion_historial();
create trigger after_users_update_ban after update on users for each row when (OLD.baneado IS DISTINCT FROM NEW.baneado) execute  procedure set_baneado_historial();
create trigger after_users_update_password after update on users for each row when (OLD.baneado IS DISTINCT FROM NEW.baneado) execute  procedure set_password_historial();