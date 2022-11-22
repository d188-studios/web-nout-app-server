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





-- MOVIMIENTOS DE PAGINA


CREATE OR REPLACE FUNCTION set_movimientos_pagina() RETURNS TRIGGER AS $set_movimientos_pagina$
    BEGIN
        --
        -- Create a row in emp_audit to reflect the operation performed on emp,
        -- making use of the special variable TG_OP to work out the operation.
        --
        IF (TG_OP = 'DELETE') THEN
            	insert into movimientos_de_pagina(id, id_pagina,id_usuario, movimiento, fecha_de_movimiento) 
		                values (gen_random_uuid(),NULL, new.uuid,'ELIMINADA',current_timestamp);
        ELSIF (TG_OP = 'UPDATE') THEN
              insert into movimientos_de_pagina(id, id_pagina, id_usuario,movimiento, fecha_de_movimiento) 
		                values (gen_random_uuid(), new.id,new.uuid ,'TITULO-EDITADO',current_timestamp);
        ELSIF (TG_OP = 'INSERT') THEN
              insert into movimientos_de_pagina(id, id_pagina,id_usuario ,movimiento, fecha_de_movimiento) 
		                values (gen_random_uuid(),new.id, new.uuid,'CREADA',current_timestamp);
        END IF;
        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$set_movimientos_pagina$ LANGUAGE plpgsql;


















-- TRIGGERS

create trigger after_users_insert after insert on users for each row execute procedure set_user_initial_state();
create trigger after_encuestas_update after update on encuestas for each row when (OLD.contestada IS DISTINCT FROM NEW.contestada) execute  procedure set_encuesta_promedio();
create trigger after_verificaciones_update after update on verificaciones for each row when (OLD.verificado IS DISTINCT FROM NEW.verificado) execute  procedure set_verificacion_historial();
create trigger after_users_update_ban after update on users for each row when (OLD.baneado IS DISTINCT FROM NEW.baneado) execute  procedure set_baneado_historial();
create trigger after_users_update_password after update on users for each row when (OLD.password IS DISTINCT FROM NEW.password) execute  procedure set_password_historial();
CREATE TRIGGER after_movimientos_pagina AFTER INSERT OR UPDATE OR DELETE ON pages FOR EACH ROW EXECUTE FUNCTION set_movimientos_pagina();