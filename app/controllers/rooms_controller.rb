class RoomsController < ApplicationController
    def index
        rooms_all = Room.all
        @room_form = Room.new
        @rooms = rooms_all.as_json(include: :messages)
    end

    def show
        @rooms = Room.all
        @room = Room.find(params[:id])
        @room_form = Room.new
    end

    def create
        @room = Room.create(room_params)
        if @room.persisted?
            room_with_messages = @room.as_json(include: :messages)
            ActionCable.server.broadcast("rooms", room_with_messages)
        else
            render :new, status: :unprocessable_entity
        end
    end

    private
        def room_params
            params.require(:room).permit(:name)
        end
end
