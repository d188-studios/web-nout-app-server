-- NUMERO DE PAGINAS DE LOS USUARIOS VERIFICADOS

drop view if exists public.paginas_usuarios_verificados;
CREATE OR REPLACE VIEW public.paginas_usuarios_verificados
AS 

select u.username as nombre_de_usuario, 
	   mdu.fecha_de_movimiento  as fecha_de_verificacion,
	   count(p."owner") as número_de_pagínas
from users u
inner join pages p 
	on p."owner" = u.uuid 
inner join movimientos_de_usuario mdu 
	on mdu.id_usuario = u.uuid 
where u.uuid in (
	select usuario from verificaciones v where v.verificado = true  
) and mdu.movimiento = 'VERIFICADO'
group by p."owner", u.username, mdu.fecha_de_movimiento 



drop view if exists public.paginas_usuarios_verificados;
CREATE OR REPLACE VIEW public.paginas_usuarios_verificados
AS SELECT u.username AS nombre_de_usuario,
    mdu.fecha_de_movimiento AS fecha_de_verificacion,
    count(p.owner) AS "número_de_pagínas"
   FROM users u
     JOIN pages p ON p.owner = u.uuid
     JOIN movimientos_de_usuario mdu ON mdu.id_usuario = u.uuid
  WHERE (u.uuid IN ( SELECT v.usuario
           FROM verificaciones v
          WHERE v.verificado = true)) AND mdu.movimiento::text = 'VERIFICADO'::text
  GROUP BY p.owner, u.username, mdu.fecha_de_movimiento;



-- CALIFICACIONES DE LOS USUARIOS SIN VERIFICAR QUE HAYAN CONTESTADO LA ENCUESTA

drop view if exists public.califiaciones_usuarios_sin_verificar;
CREATE OR REPLACE VIEW public.califiaciones_usuarios_sin_verificar
AS 

select u.nombre,
	   u.apellido,
	   e.profesion,
	   e.promedio_calificacion,
	   e.resultado_calificacion
	   
from users u 
inner join encuestas e 
	on e.encuestado = u.uuid
where e.contestada  = true 
order by e.promedio_calificacion desc  



drop view if exists public.califiaciones_usuarios_sin_verificar;
CREATE OR REPLACE VIEW public.califiaciones_usuarios_sin_verificar
AS SELECT u.nombre,
    u.apellido,
    e.profesion,
    e.promedio_calificacion,
    e.resultado_calificacion
   FROM users u
     JOIN encuestas e ON e.encuestado = u.uuid
  WHERE e.contestada = true AND (u.uuid IN ( SELECT v.usuario
           FROM verificaciones v
          WHERE v.verificado = false))
  ORDER BY e.promedio_calificacion DESC;


-- TODOS LOS USUARIOS QUE HAN SIDO BANEADOS CON SU ESTADO DE CONTESTADO DE ENCUESTA Y VERIFICADO 
drop view if exists public.valor_encuesta_verificado_usuarios_baneados;
CREATE OR REPLACE VIEW public.valor_encuesta_verificado_usuarios_baneados
AS 

select u.nombre,
	   u.apellido,
	   e.profesion,
	   e.promedio_calificacion,
	   e.resultado_calificacion
	   
from users u 
inner join encuestas e 
	on e.encuestado = u.uuid
where e.contestada  = true 
order by e.promedio_calificacion desc  


drop view if exists public.valor_encuesta_verificado_usuarios_baneados;
CREATE OR REPLACE VIEW public.valor_encuesta_verificado_usuarios_baneados
AS SELECT u.username AS nombre_de_usuario,
    mdu.fecha_de_movimiento AS fecha_de_baneo,
    e.contestada AS estado_encuesta,
    v.verificado AS estado_verificacion
   FROM users u
     JOIN movimientos_de_usuario mdu ON mdu.id_usuario = u.uuid
     JOIN encuestas e ON e.encuestado = u.uuid
     JOIN verificaciones v ON v.usuario = u.uuid
  WHERE mdu.movimiento::text = 'BANEADO'::text
  ORDER BY u.username;


